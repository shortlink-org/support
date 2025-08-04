.PHONY: help full local down clean

help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-10s\033[0m %s\n", $$1, $$2}'

full: ## Run all services (MCP gateway + app)
	docker-compose --profile full up -d

local: ## Run only MCP gateway for local development
	docker-compose --profile local up -d

down: ## Stop all services
	docker-compose down

clean: ## Stop and remove all containers, networks, and volumes
	docker-compose down -v --remove-orphans

build: ## Build the app container
	docker-compose build app

logs: ## Show logs for all services
	docker-compose logs -f
