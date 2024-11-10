migrate:
	npx prisma migrate dev --name $(MIGRATION)

dbclient:
	npx prisma generate