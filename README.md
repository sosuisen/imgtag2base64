## Overview

This API endpoint is designed to convert an image URL extracted from an HTML `<img>` tag into a base64 encoded string. It accepts a POST request with a JSON payload containing the `imgtag` key, which should include the HTML `<img>` tag. The endpoint then extracts the `src` attribute from the tag, fetches the image, and returns its base64 representation.

### Endpoint

- **POST /api/base64**

### Request

- **Body**: JSON object with the following structure:
  ```json
  {
    "imgtag": "<img src='https://example.com/image.jpg'>"
  }
  ```
  The `src` attribute can be enclosed in quotes or not, allowing both:
  ```json
  {
    "imgtag": "<img src='https://example.com/image.jpg'>"
  }
  ```
  and
  ```json
  {
    "imgtag": "<img src=https://example.com/image.jpg>"
  }
  ```


Allowing the omission of quotes can be useful in agent platforms that lack advanced string processing.

### Response

- **Success**: Returns a JSON object with the base64 encoded image.
  ```json
  {
    "base64": "iVBORw0KGgoAAAANSUhEUgAA..."
  }
  ```

- **Error**: Returns a JSON object with an error message and appropriate HTTP status code.
  ```json
  {
    "error": "Error message"
  }
  ```

### Error Handling

- If `imgtag` is missing, a 400 status code is returned with an error message.
- If no valid image URL is found in the `imgtag`, a 400 status code is returned.
- If the image cannot be fetched, a 500 status code is returned.
- If any other error occurs during processing, a 500 status code is returned.
