#!make
include .env

install: 
	bun install 

dev:
	PORT="${PORT}" bun dev

ts-lint:
	bun ts-lint
