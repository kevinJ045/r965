import path from 'node:path';

export default {
  mode: 'development',
  entry: './cilia/src/main.js',
  output: {
    path: path.resolve('./cilia/lib/js'),
    filename: 'main.js',
  },
  resolve: {
    modules: [path.resolve('./alia'), path.resolve('./node_modules')],
  },
  watch: true,
  optimization: {
    chunkIds: 'named',
    moduleIds: 'named',
    mangleExports: false
  }
}