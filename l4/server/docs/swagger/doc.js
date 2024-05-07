const doc = {
  swagger: '2.0',
  info: {
    title: 'User API',
    description: 'A simple CRUD API for managing users',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://127.0.0.1:3001/users',
    },
  ],
  paths: {
    '/users': {
      get: {
        summary: 'Get all users',
        description: 'Returns a list of all users',
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/definitions/User',
                  },
                },
              },
            },
          },
        },
      },
      delete: {
        summary: 'Delete all users',
        description: 'Deletes all users from the database',
        responses: {
          200: {
            description: 'All users deleted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      description: 'Success message',
                    },
                  },
                },
              },
            },
          },
          500: {
            description: 'Internal Server Error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      description: 'Error message',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/users/{id}': {
      get: {
        summary: 'Get a user by ID',
        description: 'Returns a specific user by its ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'integer',
            description: 'The ID of the user to retrieve',
          },
        ],
        responses: {
          200: {
            description: 'Success',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/definitions/User',
                },
              },
            },
          },
          404: {
            description: 'User not found',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      description: 'Error message',
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create a new user',
        description: 'Creates a new user and returns the created user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/User',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Created',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/definitions/User',
                },
              },
            },
          },
          400: {
            description: 'Bad Request',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      description: 'Error message (e.g., email already exists)',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  definitions: {
    User: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          description: 'The unique identifier of the user',
        },
        name: {
          type: 'string',
          description: 'The name of the user',
        },
        email: {
          type: 'string',
          format: 'email',
          description: 'The email address of the user',
        },
        password: {
          type: 'string',
          description: 'The password of the user',
        },
      },
      required: ['name', 'email', 'password'],
    },
  },
};

export default doc;
