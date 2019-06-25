clean:
		find . -name "*error.log" -type f -delete
		find . -name "*debug.log" -type f -delete
		rm -rf ./node_modules/
		rm -rf ./.cache-loader/
		rm -rf ./dist/
		npm install

build:
		npx babel ./src/ --out-dir ./dist --ignore tests,spec.js,spec.jsx,__snapshots__,.eslintrc.js,jest.config.js,dist,coverage,node_modules
		cp ./package.json ./dist/ 2>/dev/null || :
		cp ./package-lock.json ./dist/ 2>/dev/null || :
		cp ./README.md ./dist/ 2>/dev/null || :
		cp ./index.d.ts ./dist/ 2>/dev/null || :
