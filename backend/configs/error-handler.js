export default function errorHandler(err, req, res, next) {
    switch (true) {
        case typeof err === 'string':
                return res.status(400).json({ message: err });
        default:
            return res.status(500).json({ message: err.message });
    }
}