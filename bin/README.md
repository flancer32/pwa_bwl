# `/bin/` folder

Web application executable scripts are placed here.

## `./deploy/`

### `./clone.sh`

Script to clone project from github repo and deploy application in `live` mode.

### `./dev.sh`

Script to deploy application in development mode. Some npm-modules are cloned into `./own_modules/` folder and are
linked into `./node_modules/` to get VCS available for the sources.

### `./live.sh`

Script to deploy application in `live` mode.

## `./service/`

* `./backup/`: back up database and rotate dumps.

## `./commons.sh`

Shell subroutine to load local configuration for shell scripts (deploy, service, etc.).

## `./pwa-tequila.service`

File to create `systemd` service to start/stop PWA. Link this file to `/etc/systemd/system/` folder:

```shell
# cd /etc/systemd/system/ 
# ln -s /.../bin/pwa-tequila.service
```

Validate installed services:

```shell
$ systemctl list-units --type=service
```

## `./tequila.js`

Default commands for `tequila` application:

```
$ cd ${APP_HOME}
$ ./bin/tequila.js 
Usage: tequila [options]

Options:
  --core-server-start  Start application's web server.
  --core-server-stop   Stop application's web server.
  -v, --version        output the version number
  -h, --help           output usage information
```
