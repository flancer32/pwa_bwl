# @flancer32/pwa_bwl

"_Bruderschaft Weight Loss_" is the Progressive Web Application (PWA) to monitor weight changes in a group with a friends.

## Setup Application for Development

```shell
$ git clone git@github.com:flancer32/pwa_bwl.git
$ cd pwa_bwl
$ bash ./bin/deploy/dev/sh
```

Look up for dependencies sources in `./own_modules/`.

## Configuration

```shell
$ cd ./cfg
$ cp init.json local.json
$ nano local.json
...
```

### Configure DB

Use `mysql2` or `pg` client to connect to RDBMS:
```json
{
  "db": {
    "main": {
      "client": "mysql2|pg",
      "connection": {
        "host": "127.0.0.1",
        "user": "...",
        "password": "...",
        "database": "..."
      }
    }
  }
}
```

### Configure Network

NodeJS `http2` server will use `server.port` and `web.urlBase` for the work:
```json
{
  "server": {
    "port": 3000
  },
  "web": {
    "urlBase": "project.com"
  }
}
```

### Configure Proxy Server

I use Apache Web server to secure HTTP requests/responses with TLS and redirect it to/from NodeJS `http2` server:

```apacheconf
<VirtualHost *:80>
    ServerName project.com

    LogLevel warn
    ErrorLog  /var/log/apache2/bwl_error.log
    CustomLog /var/log/apache2/bwl_access.log combined

    # Redirect all to HTTPS
    RewriteEngine on
    RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]
</VirtualHost>

<VirtualHost *:443>
    ServerName project.com

    LogLevel warn
    ErrorLog  /var/log/apache2/error.log
    CustomLog /var/log/apache2/access.log combined

    SSLCertificateFile /etc/letsencrypt/live/project.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/project.com/privkey.pem
    Include /etc/letsencrypt/options-ssl-apache.conf

    # Redirect all requests to HTTP2 server.
    RewriteEngine  on
    RewriteRule    "^/(.*)$"  "h2c://localhost:3000/$1"  [P]

</VirtualHost>
```

Use [letsencrypt.org](https://letsencrypt.org/) to issue TLS certificate for free (you need real domain name like `bwl.your-domain.com`). This is simple config for your Apache for this case:

```apacheconf
<VirtualHost *:80>
    ServerName bwl.your-domain.com

    LogLevel warn
    ErrorLog  /var/log/apache2/error.log
    CustomLog /var/log/apache2/access.log combined

    DocumentRoot /var/www/html
    <Directory /var/www/html/>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```


# Run Application


## Recreate Database

All data will be lost:
```shell
$ npm run db-reset
```

Data will be backed up before and restored after:
```shell
$ npm run db-upgrade
```

## Start/Stop Application

```shell
$ npm run start
$ npm run stop
```

### Get All Available Commands

```shell
$ node ./bin/tequila.mjs --help
```
