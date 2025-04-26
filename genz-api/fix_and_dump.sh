#!/bin/bash

# Create a backup directory if it doesn't exist
BACKUP_DIR="/home/zcroll/Desktop"
BACKUP_FILE="${BACKUP_DIR}/genZ_backup_$(date +%Y%m%d_%H%M%S).sql"

# Simple direct dump with --force option to ignore errors
mysqldump --force --user=root --password='xdxs' --host=127.0.0.1 --port=3306 genZ > "$BACKUP_FILE"

# Check if the dump was successful
if [ -s "$BACKUP_FILE" ]; then
    echo "Database successfully backed up to $BACKUP_FILE"
    echo "File size: $(du -h "$BACKUP_FILE" | cut -f1)"
else
    echo "Error: Backup file is empty or not created."
fi
