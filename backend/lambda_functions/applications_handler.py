"""
AWS Lambda handler for Applications using DynamoDB.
"""
import json
import boto3
import uuid
from datetime import datetime, timezone

dynamodb = boto3.resource("dynamodb", region_name="us-east-1")
applications_table = dynamodb.Table("JobProviderApplications")

def respond(status_code, body):
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "X-API-Key,Content-Type",
        },
        "body": json.dumps(body, default=str)
    }

def check_api_key(event):
    headers = event.get("headers", {}) or {}
    key = headers.get("X-API-Key") or headers.get("x-api-key")
    return key == "your-production-api-key-here"

def handler(event, context):
    if not check_api_key(event):
        return respond(403, {"error": "Forbidden"})

    method = event.get("httpMethod", "")
    path = event.get("path", "")
    path_params = event.get("pathParameters") or {}

    try:
        body = json.loads(event.get("body") or "{}")
    except:
        body = {}

    # ─── POST /applications ──────────────────────────────────
    if method == "POST" and path == "/applications":
        # Check duplicate
        existing = applications_table.scan(
            FilterExpression="job_id = :jid AND applicant_id = :aid",
            ExpressionAttributeValues={
                ":jid": body.get("job_id"),
                ":aid": body.get("applicant_id")
            }
        )
        if existing.get("Items"):
            return respond(400, {"error": "Already applied"})

        app_id = str(uuid.uuid4())
        item = {
            "id": app_id,
            "job_id": body.get("job_id"),
            "applicant_id": body.get("applicant_id"),
            "applicant_name": body.get("applicant_name"),
            "applicant_email": body.get("applicant_email"),
            "cover_letter": body.get("cover_letter", ""),
            "resume_url": body.get("resume_url", ""),
            "status": "pending",
            "applied_at": datetime.now(timezone.utc).isoformat(),
        }
        applications_table.put_item(Item=item)
        return respond(201, {"success": True, "application_id": app_id})

    # ─── GET /applications/job/{job_id} ─────────────────────
    elif method == "GET" and path_params.get("job_id"):
        result = applications_table.scan(
            FilterExpression="job_id = :jid",
            ExpressionAttributeValues={":jid": path_params["job_id"]}
        )
        items = sorted(result.get("Items", []), key=lambda x: x.get("applied_at", ""), reverse=True)
        return respond(200, items)

    # ─── GET /applications/applicant/{applicant_id} ──────────
    elif method == "GET" and path_params.get("applicant_id"):
        result = applications_table.scan(
            FilterExpression="applicant_id = :aid",
            ExpressionAttributeValues={":aid": path_params["applicant_id"]}
        )
        items = sorted(result.get("Items", []), key=lambda x: x.get("applied_at", ""), reverse=True)
        return respond(200, items)

    # ─── PUT /applications/{id}/status ──────────────────────
    elif method == "PUT" and path_params.get("application_id"):
        applications_table.update_item(
            Key={"id": path_params["application_id"]},
            UpdateExpression="SET #s = :s",
            ExpressionAttributeNames={"#s": "status"},
            ExpressionAttributeValues={":s": body.get("status")}
        )
        return respond(200, {"success": True})

    return respond(404, {"error": "Route not found"})