module.exports = {
    plugins: [
        require('autoprefixer'),
        require('cssnano')({
            preset: [
                'advanced',
                {
                    autoprefixer: false,
                    discardComments: {
                        removeAll: true,
                    },
                },
            ],
        }),
    ],
};
