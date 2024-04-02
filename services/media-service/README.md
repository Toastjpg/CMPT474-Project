# Media Service
For reading/writing files uploads.

### Notes
Create a .env file under /media-service and include:
```
PROJECT_ID='your_project_id'
GCS_KEY_FILENAME='gcs-key.json'
BUCKET_NAME='your_bucket_name'
```
Create a gcs-key.json file under /media-service/keys/ generated from google cloud service accounts.