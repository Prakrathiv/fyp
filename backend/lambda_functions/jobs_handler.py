"""
AWS Lambda handler for Jobs using DynamoDB.
Deploy this when moving to production.
Each function maps to an API Gateway route.
"""
import json
import boto3
import uuid
from datetime import datetime, timezone
from boto3.dynamodb.conditions import Key, Attr

dynamodb = boto3.resource("dynamodb", region_name="us-east-1")
jobs_table = dynamodb.Table("JobProviderJobs")
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
    return key == "your-production-api-key-here"  # change this!

# ─── HANDLER ────────────────────────────────────────────────
def handler(event, context):
    if not check_api_key(event):
        return respond(403, {"error": "Forbidden: Invalid API Key"})

    method = event.get("httpMethod", "")
    path = event.get("path", "")
    path_params = event.get("pathParameters") or {}
    query_params = event.get("queryStringParameters") or {}

    try:
        body = json.loads(event.get("body") or "{}")
    except:
        body = {}

    # ─── POST /jobs ─────────────────────────────────────────
    if method == "POST" and path == "/jobs":
        job_id = str(uuid.uuid4())
        item = {
            "id": job_id,
            "user_id": body.get("user_id"),
            "title": body.get("title"),
            "description": body.get("description", ""),
            "min_salary": body.get("min_salary", ""),
            "max_salary": body.get("max_salary", ""),
            "shift": body.get("shift", ""),
            "job_type": body.get("job_type", ""),
            "city": body.get("city", ""),
            "area": body.get("area", ""),
            "charge_fee": body.get("charge_fee", ""),
            "company_type": body.get("company_type", ""),
            "company_email": body.get("company_email", ""),
            "status": "active",
            "created_at": datetime.now(timezone.utc).isoformat(),
        }
        jobs_table.put_item(Item=item)
        return respond(201, {"success": True, "job_id": job_id})

    # ─── GET /jobs ───────────────────────────────────────────
    elif method == "GET" and path == "/jobs":
        result = jobs_table.scan()
        jobs = result.get("Items", [])

        # Filter by query params
        if query_params.get("city"):
            jobs = [j for j in jobs if j.get("city") == query_params["city"]]
        if query_params.get("job_type"):
            jobs = [j for j in jobs if j.get("job_type") == query_params["job_type"]]
        if query_params.get("status"):
            jobs = [j for j in jobs if j.get("status") == query_params["status"]]
        else:
            jobs = [j for j in jobs if j.get("status") == "active"]

        jobs.sort(key=lambda x: x.get("created_at", ""), reverse=True)
        return respond(200, jobs)

    # ─── GET /jobs/{id} ──────────────────────────────────────
    elif method == "GET" and path_params.get("job_id"):
        result = jobs_table.get_item(Key={"id": path_params["job_id"]})
        item = result.get("Item")
        if not item:
            return respond(404, {"error": "Job not found"})
        return respond(200, item)

    # ─── PUT /jobs/{id} ──────────────────────────────────────
    elif method == "PUT" and path_params.get("job_id"):
        job_id = path_params["job_id"]
        update_expr = "SET " + ", ".join([f"#{k} = :{k}" for k in body])
        expr_names = {f"#{k}": k for k in body}
        expr_values = {f":{k}": v for k, v in body.items()}
        jobs_table.update_item(
            Key={"id": job_id},
            UpdateExpression=update_expr,
            ExpressionAttributeNames=expr_names,
            ExpressionAttributeValues=expr_values
        )
        return respond(200, {"success": True})

    # ─── DELETE /jobs/{id} ───────────────────────────────────
    elif method == "DELETE" and path_params.get("job_id"):
        jobs_table.delete_item(Key={"id": path_params["job_id"]})
        return respond(200, {"success": True})

    return respond(404, {"error": "Route not found"})