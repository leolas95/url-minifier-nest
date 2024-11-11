migrate:
	npx prisma migrate dev --name=$(NAME)

dbclient:
	npx prisma generate