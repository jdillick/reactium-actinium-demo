define({ "api": [  {    "type": "post",    "url": "/functions/hello",    "title": "",    "version": "0.1.0",    "group": "Example",    "name": "hello",    "description": "<p>Hello World cloud function.</p>",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "msg",            "description": "<p>The hello message.</p>"          }        ]      }    },    "examples": [      {        "title": "Example Usage:",        "content": "const sayHello = async ({ msg }) => {\n  const output = await Parse.Cloud.run('hello', { msg });\n  console.log(output);\n}",        "type": "js"      }    ],    "success": {      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"msg\": \"String\"\n}",          "type": "json"        }      ]    },    "filename": "src/app/cloud/hello/hello.js",    "groupTitle": "Example"  }] });
