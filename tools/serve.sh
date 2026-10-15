#!/bin/bash
# Preview the built site at http://localhost:8080
cd "$(dirname "$0")/../dist" && python3 -m http.server 8080
