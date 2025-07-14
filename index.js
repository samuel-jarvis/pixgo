#!/usr/bin/env node

const process = globalThis.process;
import program from './src/main.js'

program.parse(process.argv)