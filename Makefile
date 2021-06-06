up:
	docker-compose up
down:
	docker-compose down
stop:
	docker-compose stop
api:
	docker exec -it email-sender-api /bin/sh
pg:
	docker exec -it email-sender-db bash -c "psql -h 127.0.0.1 -U dev -d mail_sender -W"
redis:
	docker exec -it email-sender-redis sh -c "redis-cli"
