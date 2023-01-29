FROM node:19-alpine

# Fix missing apk in PATH
ENV PATH="${PATH}:/sbin"

# Install Python3 and scikit-learn dependencies
RUN apk add --update --no-cache make automake gcc g++ subversion python3-dev py3-pip gfortran openblas-dev linux-headers
# Install scikit-learn
RUN pip install -U scikit-learn

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]