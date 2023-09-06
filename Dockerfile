ARG NODE_VERSION=18-bookworm-slim
FROM node:${NODE_VERSION}

# alpine based
# RUN apk add --no-cache make pkgconfig gcc g++ python3 libx11-dev libxkbfile-dev libsecret-dev
# debian based
RUN apt-get update && \
    apt-get install -y make pkg-config gcc g++ python3 libx11-dev libxkbfile-dev libsecret-1-dev

WORKDIR /home/ide
ADD . .

RUN yarn install

ENV NODE_OPTIONS="--max_old_space_size=4096"

WORKDIR /home/ide/bb-start-utils
RUN yarn prepare

WORKDIR /home/ide/browser-app
RUN yarn download:plugins

WORKDIR /home/ide
RUN yarn build:browser && \
    yarn autoclean --init && \
    echo *.ts >> .yarnclean && \
    echo *.ts.map >> .yarnclean && \
    echo *.spec.* >> .yarnclean && \
    yarn autoclean --force && \
    yarn cache clean

FROM node:${NODE_VERSION}

# Env variables
ENV HOME=/root/bb \
    SHELL=/bin/bash \
    THEIA_DEFAULT_PLUGINS=local-dir:/home/ide/browser-app/plugins \
    USE_LOCAL_GIT=true \
    TINI_KILL_PROCESS_GROUP=1

# Whenever possible, install tools using the distro package manager
# alpine based apk add
# RUN apk add --no-cache git openssh bash libsecret tini jq curl socat
# debian based apt-get install
RUN apt-get update && \
    apt-get install -y git openssh-client bash libsecret-1-0 jq curl socat

# Setup folders
RUN mkdir -p /home/ide && \
    mkdir -p /root/bb/workspace && \
    mkdir -p /root/.m2 && \
    mkdir -p /root/.theia && \
    # Configure a nice terminal
    echo "export PS1='\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '" >> /root/.bashrc && \
    # Fake poweroff (stops the container from the inside by sending SIGHUP to PID 1)
    echo "alias poweroff='kill -1 1'" >> /root/.bashrc && \
    # Setup an initial workspace
    echo '{"recentRoots":["file:///root/bb/workspace"]}' > /root/.theia/recentworkspace.json && \
    # Setup settings (file icons theme)
    echo '{"workbench.iconTheme": "vs-seti"}' > /root/.theia/settings.json

# Copy files from previous stage 
COPY --from=0 /home/ide /home/ide

# Running environment
EXPOSE 3030
WORKDIR /root/bb/workspace
USER root
CMD [ "node", "/home/ide/browser-app/src-gen/backend/main.js", "--hostname=0.0.0.0", "--port=3030" ]
