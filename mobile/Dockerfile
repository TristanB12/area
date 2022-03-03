# Don't forget to move file 'julienp17-upload.keystore' in ./android/app/
# IT IS NOT CHECKED INTO GIT

# https://github.com/gengjiawen/ci-sample/blob/master/.github/workflows/github-ci.yml
# https://github.com/react-native-community/docker-android

FROM reactnativecommunity/react-native-android

WORKDIR /app

COPY . .

RUN npx envinfo && mkdir -p ./android/app/build/ && mkdir -p ./build
CMD cat .gradle.properties >> ./android/gradle.properties && npm install && cd android && chmod +x gradlew && ./gradlew assembleRelease