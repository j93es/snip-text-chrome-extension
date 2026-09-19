# API Documentation

## Common Error Response

```json
{
  "statusCode": 404,
  "data": { "msg": "router not founded" }
}
```

```json
{
  "statusCode": 500,
  "data": { "msg": "{{ JSON.stringify(error) }}" }
}
```

## background

### editor - from content

#### PUT - /editor/update-status

##### Request

```json
{
  "src": "CONTENT",
  "dst": "BACKGROUND",
  "data": {
    "venderName": true | false,
    "status": { "isEditorRendered": true | false }
  }
}
```

##### Response

```json
{
  "statusCode": 200,
  "data": { "msg": "ok" }
}
```

```json
{
  "statusCode": 400,
  "data": { "msg": "Invaild data field" }
}
```

### editor - from popup

#### GET - /editor/is-editor-rendered

##### Request

```json
{
  "src": "POPUP",
  "dst": "BACKGROUND",
  "path": "/editor/insert-text",
  "method": "PUT",
  "data": { "venderName": "NAVER" | "GOOGLE" }
}
```

##### Response

```json
{
  "statusCode": 200,
  "data": { "isEditorRendered": true | false }
}
```

```json
{
  "statusCode": 400,
  "data": { "msg": "Invaild data field" }
}
```

## cotent

### editor - from popup

#### PUT - /editor/insert-text

##### Request

```json
{
  "src": "POPUP",
  "dst": "BACKGROUND",
  "path": "/editor/insert-text",
  "method": "PUT",
  "data": { "text": "{{ mail template }}" }
}
```

##### Response

```json
{
  "statusCode": 200,
  "data": {
    "prevText": "{{ prev mail text }}",
    "insertedText": "{{ mail template }}",
    "currentText": "{{ mail template }}",
    "isInserted": true | false
  }
}
```

```json
{
  "statusCode": 400,
  "data": { "msg": "Invalid data field" }
}
```

```json
{
  "statusCode": 404,
  "data": { "msg": "{{ venderName }} editor not found." }
}
```
