# API Documentation

## scheme

### Type

```ts
interface EditorStatus {
  isEditorRendered: boolean;
  text: string;
}
```

```ts
type EditorVendorName = "GOOGLE" | "NAVER";
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
    "vendrName": EditorVendorName,
    "status": EditorStatus
  }
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

### editor

#### GET - /editor/status

##### Request

```json
{
  "src": "POPUP" | "CONTENT",
  "dst": "BACKGROUND",
  "path": "/editor/status",
  "method": "GET",
  "data": { "vendrName": "{{ vender name }}" }
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

##### Request

```json
{
  "src": "POPUP",
  "dst": "BACKGROND",
  "path": "/editor/insert-text",
  "method": "PUT",
  "data": { "text": "{{ mail template }}" }
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
  "data": { "msg": "Invalid data field" }
}
```

```json
{
  "statusCode": 404,
  "data": { "msg": "{{ vendrName }} editor not found." }
}
```

## cotent

### editor

#### PUT - /editor/insert-text

##### Request

```json
{
  "src": "BACKGROND",
  "dst": "CONTENT",
  "path": "/editor/insert-text",
  "method": "PUT",
  "data": { "text": "{{ mail template }}" }
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
  "data": { "msg": "Invalid data field" }
}
```

```json
{
  "statusCode": 404,
  "data": { "msg": "{{ vendrName }} editor not found." }
}
```
