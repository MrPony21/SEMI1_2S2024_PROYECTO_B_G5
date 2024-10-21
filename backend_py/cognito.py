import boto3
import os
from botocore.exceptions import BotoCoreError, ClientError
from dotenv import load_dotenv
from flask import jsonify

load_dotenv()

AWS_REGION = os.getenv('AWSREGION')
ACCESS_KEY = os.getenv('ACCESSKEY')
SECRET_KEY = os.getenv('SECRETACCESSKEY')
CLIENT_ID = os.getenv('CLIENTID')
USERPOOL_ID = os.getenv('USERPOOLID')

# Configurar el cliente de Cognito con las credenciales manualmente
cognito_client = boto3.client(
    'cognito-idp',
    region_name=AWS_REGION,
    aws_access_key_id=ACCESS_KEY,
    aws_secret_access_key=SECRET_KEY
)

def enable_auth_flow():
    try:
        cognito_client.update_user_pool_client(
            UserPoolId=USERPOOL_ID,
            ClientId=CLIENT_ID,
            ExplicitAuthFlows=[
                'ALLOW_USER_PASSWORD_AUTH',
                'ALLOW_REFRESH_TOKEN_AUTH'
            ]
        )
        print("Flujos de autenticación habilitados con éxito.")
    except ClientError as error:
        print(f"Error habilitando los flujos: {error}")

enable_auth_flow()

def signup(email, password):
    try:
        cognito_client.sign_up(
            ClientId=CLIENT_ID,
            Username=email,
            Password=password,
            UserAttributes=[{'Name': 'email', 'Value': email}]
        )
        return jsonify({"message": "User registered successfully"}), 201
    except (BotoCoreError, ClientError) as e:
        return jsonify({"error": str(e)}), 400

def confirm_signup(username, code):
    try:
        cognito_client.confirm_sign_up(
            ClientId=CLIENT_ID,
            Username=username,
            ConfirmationCode=code
        )
        return jsonify({"message": "User confirmed successfully"}), 200
    except (BotoCoreError, ClientError) as e:
        return jsonify({"error": str(e)}), 400

def signin(username, password):
    try:
        response = cognito_client.initiate_auth(
            ClientId=CLIENT_ID,
            AuthFlow='USER_PASSWORD_AUTH',
            AuthParameters={
                'USERNAME': username,
                'PASSWORD': password
            }
        )
        return jsonify({
            "AccessToken": response['AuthenticationResult']['AccessToken'],
            "IDToken": response['AuthenticationResult']['IdToken'],
            "RefreshToken": response['AuthenticationResult']['RefreshToken']
        }), 200
    except ClientError as error:
        error_code = error.response['Error']['Code']
        if error_code == 'InvalidParameterException':
            return jsonify({
                "error": "El flujo USER_PASSWORD_AUTH no está habilitado."
            }), 400
        return jsonify({"error": str(error)}), 400

def is_confirmed(username):
    try:
        response = cognito_client.admin_get_user(
            UserPoolId=USERPOOL_ID,
            Username=username
        )
        is_confirmed = any(
            attr['Name'] == 'email_verified' and attr['Value'] == 'true'
            for attr in response['UserAttributes']
        )
        return jsonify({"isConfirmed": is_confirmed}), 200
    except (BotoCoreError, ClientError) as e:
        return jsonify({"error": str(e)}), 400
