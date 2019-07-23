/**
 * @api {post} /functions/hello
 * @apiVersion 0.1.0
 * @apiGroup Example
 * @apiName hello
 * @apiDescription Hello World cloud function.
 *
 * @apiParam {String} msg The hello message.
 *
 * @apiExample {js} Example Usage:
 * const sayHello = async ({ msg }) => {
 *   const output = await Parse.Cloud.run('hello', { msg });
 *   console.log(output);
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "msg": "String"
 *  }
 */

Parse.Cloud.define('hello', req => {
    const { msg = 'Hello' } = req.params;
    return { msg };
});
