/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The user ID
 *                     example: '123'
 *                   name:
 *                     type: string
 *                     description: The user's name
 *                     example: 'John Doe'
 */
app.get("/users", (req, res) => {
  // Your code to fetch and return users
});
