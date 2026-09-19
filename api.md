# API Documentation

## scheme

### EditorStatus

```json
{
  "isEditorRendered": true | false,
  "text": "{{ mail text }}"
}
```

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
  "path": "/editor/update-status",
  "method": "PUT",
  "data": {
    "venderName": true | false,
    "status": EditorStatus
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

### editor

#### GET - /editor/status

##### Request

```json
{
  "src": "POPUP",
  "dst": "BACKGROUND",
  "path": "/editor/status",
  "method": "GET",
  "data": { "venderName": "{{ vender name }}" }
}
```

##### Response

```json
{
  "statusCode": 200,
  "data": EditorStatus
}
```

```json
{
  "statusCode": 400,
  "data": { "msg": "Invaild data field" }
}
```

## cotent

### editor

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
