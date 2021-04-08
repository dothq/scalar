module.exports = {
  plugins: [
    {
      name: 'typescript',
      options: {
        useBabel: true,
        tsLoader: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
        forkTsChecker: {
          eslint: {
            files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
          },
        },
      },
    },
    'mdx',
  ],
}
