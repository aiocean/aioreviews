# Software Architecture

## Tech stack

In this project, I want to ship it as soon as possible, and prepare some space for feature improvement. With this in mind, I choose the following tech stack:

- [Vue.js](https://vuejs.org/) for frontend
- [Go](https://golang.org/) for backend
- [MongoDB](https://www.mongodb.com/) for database
- [Flyio](https://fly.io/) for service hosting
- [Cloudflare](https://www.cloudflare.com/) for frontend hosting
- [Github](https://github.com) for source code hosting
- Redis for cache
- Redis stream for event bus

## Architecture

This is a simple application, so, we will use client-server architecture. The client will be a single page application, and the server will be a RESTful API server.

This architecture allow us to move very fast, but can lead to some problems in the future, such as:

- Maintainability: the codebase can become a mess
- Scalability: The whole system can't scale well

To solve these problems, we will use the following techniques:

- Use dependency injection to make the codebase more maintainable
- Use stateless service and event driven architecture to make the system more scalable

### Dependency Injection

Dependency Injection (DI) is a design pattern that allows us to create more flexible, reusable, and testable code. It involves passing dependencies to objects, rather than having objects create their own dependencies. This reduces the coupling between classes and leads to more modular code.

In our application, we will use Google's [Wire](https://github.com/google/wire) and the [Usefully Wiresets](https://github.com/aiocean/wireset) to implement Dependency Injection. These tools provide a simple and understandable way to manage dependencies in our Go codebase.

Here's how it works:

1. **Define Dependencies:** We first define our dependencies in our code. These could be services, repositories, or other components that our objects need to function.

2. **Create Wiresets:** We then use Wire to create "wiresets", which are instructions on how to create and provide our dependencies.

3. **Generate Code:** Wire then generates code based on these wiresets. This code takes care of creating and providing our dependencies, so we don't have to manually write this boilerplate code ourselves.

4. **Use Dependencies:** Finally, we can use these dependencies in our code. Instead of directly creating dependencies, our objects will receive them as parameters. This makes our code more flexible and easier to test.

It allows us to easily swap out dependencies, which is especially useful in testing environments. Furthermore, it makes our code easier to understand, as the relationships between objects are made explicit through their dependencies.

### Stateless Service

Our system will utilize a stateless architecture to improve scalability. In this model, each request is processed individually, without the need for any stored session data.

This approach allows our system to efficiently manage a high volume of requests, as there's no need to maintain and synchronize session data across multiple servers. Consequently, our system becomes more scalable and easier to manage.

### Event Driven Architecture

Event-driven architecture (EDA) is a software design pattern that promotes the production, detection, consumption of, and reaction to events. An event can be defined as a significant change in state. For example, when a customer places an order, that's an event. 

In our application, we will use EDA to handle actions such as review submission, review approval, and review deletion or imported. These actions will trigger events that our system will react to.

By using EDA, we can ensure that our system is highly scalable and flexible. It allows us to easily add new features and services to our system by simply adding new event consumers. Furthermore, since the event producers and consumers are decoupled, we can update or modify them independently without affecting the rest of the system.

