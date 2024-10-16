#!/bin/sh

setup() {
    ROOT_DIR=/usr/share/nginx/html

    # Replace env vars in JavaScript files
    echo "Replacing env constants in JS"
    for file in $ROOT_DIR/js/app.js $ROOT_DIR/index.html;
    do
    echo "Processing $file ...";

    sed -i 's|VUE_APP_WEB_SOCKET_SERVER_VALUE|'${VUE_APP_WEB_SOCKET_SERVER}'|g' $file
    done
}

setup
exec "$@"