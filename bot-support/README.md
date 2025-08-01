# Telegram bot support service

<img width='200' height='200' src="./docs/public/logo.png">

> [!WARNING]
> This service is under development.

### ADR

- [ADR-0001](./docs/ADR/decisions/0001-init.md) - Init project

### Architecture

We use the C4 model to describe architecture.

#### System context diagram

```plantuml
!include https://raw.githubusercontent.com/shortlink-org/shortlink/main/docs/c4/containers/preset/common.puml
!include https://raw.githubusercontent.com/shortlink-org/shortlink/main/docs/c4/containers/preset/c1.puml

```

#### Use case diagram

The use case diagram shows which functionality of the developed software system is
available to each group of users.

```plantuml
!include https://raw.githubusercontent.com/shortlink-org/shortlink/main/docs/c4/containers/preset/common.puml
!include https://raw.githubusercontent.com/shortlink-org/shortlink/main/docs/c4/containers/preset/usecase.puml

```

**Use cases**:

- [UC-1](./internal/usecases/shop) - Shop use cases (get status of order, get order by id, etc.)
