#!/usr/bin/env python
from BaseHTTPServer import HTTPServer, test
from SimpleHTTPServer import SimpleHTTPRequestHandler

SimpleHTTPRequestHandler.extensions_map['.less'] = 'text/css'
SimpleHTTPRequestHandler.extensions_map['.ks'] = 'text/javascript'

test(SimpleHTTPRequestHandler, HTTPServer)