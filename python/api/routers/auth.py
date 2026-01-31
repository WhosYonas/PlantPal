import jwt
from datetime import datetime, timedelta, timezone
try:
    from fastapi import HTTPException, Depends
    from fastapi.security import OAuth2PasswordBearer
except Exception:
    # Fallback stubs for environments without fastapi (e.g., editor/linter)
    class HTTPException(Exception):
        def __init__(self, status_code: int = 500, detail: str = ""):
            super().__init__(detail)
            self.status_code = status_code
            self.detail = detail

    def Depends(dependency=None):
        return dependency

    def OAuth2PasswordBearer(tokenUrl: str):
        # minimal callable placeholder compatible with dependency injection usage
        def _dummy():
            return None
        return _dummy

SECRET_KEY = "your-super-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/login")

# Generate token
def create_access_token(
    data: dict,
    expires_delta: int = ACCESS_TOKEN_EXPIRE_MINUTES
):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=expires_delta)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
# Decode token
def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("user_id")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return user_id
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
