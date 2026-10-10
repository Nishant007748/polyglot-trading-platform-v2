FROM golang:1.22-alpine AS builder
WORKDIR /src
COPY . .
RUN go build -o app main.go
FROM alpine:3.20
WORKDIR /app
COPY --from=builder /src/app ./app
EXPOSE 3002
CMD ["./app"]
