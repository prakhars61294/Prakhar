var services = require('../controllers/reviews_services')

module.exports = (router) => {
    // Create the Reviews bu product Id

    router.post('/reviews/:p_id', function(req, res) {
        services.create_review(req, res);
    })

    // Show the product reviews

    router.get('/reviews/:p_id', function(req, res) {
        services.show_product_reviews(req, res);
    })

    // Delete the reviews by the product Id

    router.get('/reviews/delete/:p_id/:id', function(req, res) {
        services.delete_review(req, res);
    })

    // Update the reviews by the product Id

    router.get('/reviews/update/:p_id/:id', function(req, res) {
        services.update_review(req, res);
    })
}