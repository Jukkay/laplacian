create-client:
	docker-compose up -d --force-recreate laplacian_client

create-analyzer:
	docker build -t tori/laplacian_analyzer ./analyzer
	docker-compose up -d --force-recreate laplacian_analyzer

create: 
	docker build -t tori/laplacian_analyzer ./analyzer
	create-client create-analyzer

up:
	docker exec laplacian_analyzer bash -c "go build -v -o /usr/local/bin/laplacian /go/src/laplacian"
	docker-compose up

restart:
	docker-compose up -d

down:
	docker-compose down

clean:
	docker-compose down --remove-orphans

install-client:
	docker-compose run --rm laplacian_client "npm install"

install-api:
	docker-compose run --rm laplacian_api "npm install"

install: install-client install-server

goto-client:
	docker-compose exec laplacian_client bash

goto-api:
	docker-compose exec laplacian_api bash

goto-analyzer:
	docker-compose exec laplacian_analyzer bash

logs:
	docker-compose logs -f
