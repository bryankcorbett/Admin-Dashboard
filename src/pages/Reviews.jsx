import { useState, useEffect } from 'react'

const reviewStats = [
  { label: 'Total Reviews', value: 0, key: 'total' },
  { label: 'Average Rating', value: 0, key: 'average' },
  { label: '5 Star', value: 0, key: 'five' },
  { label: '4 Star', value: 0, key: 'four' },
  { label: '3 Star', value: 0, key: 'three' },
  { label: '2 Star', value: 0, key: 'two' },
  { label: '1 Star', value: 0, key: 'one' },
]

const recentReviews = [
  {
    id: 1,
    user: 'John Smith',
    rating: 5,
    comment: 'Excellent service! The NFC integration worked perfectly for our business.',
    date: '2 hours ago',
    business: 'Coffee Shop ABC',
    verified: true
  },
  {
    id: 2,
    user: 'Sarah Johnson',
    rating: 4,
    comment: 'Great experience overall, but the setup process could be simpler.',
    date: '5 hours ago',
    business: 'Restaurant XYZ',
    verified: true
  },
  {
    id: 3,
    user: 'Mike Wilson',
    rating: 5,
    comment: 'Outstanding customer support and the platform is very intuitive.',
    date: '1 day ago',
    business: 'Retail Store 123',
    verified: false
  },
  {
    id: 4,
    user: 'Emily Davis',
    rating: 3,
    comment: 'Good features but needs better documentation.',
    date: '2 days ago',
    business: 'Spa & Wellness',
    verified: true
  },
  {
    id: 5,
    user: 'David Brown',
    rating: 5,
    comment: 'Perfect solution for our loyalty program. Highly recommended!',
    date: '3 days ago',
    business: 'Fitness Center',
    verified: true
  }
]

export default function Reviews() {
  const [stats, setStats] = useState(reviewStats)
  const [selectedFilter, setSelectedFilter] = useState('all')

  useEffect(() => {
    // Simulate demo data loading
    const demoData = {
      total: 1247,
      average: 4.2,
      five: 892,
      four: 234,
      three: 89,
      two: 23,
      one: 9
    }

    // Animate stats counters
    const animateStats = (key, targetValue) => {
      const duration = 2000
      const startTime = Date.now()
      const startValue = 0

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const currentValue = Math.floor(startValue + (targetValue - startValue) * progress)

        setStats(prev => prev.map(item => 
          item.key === key ? { ...item, value: currentValue } : item
        ))

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      animate()
    }

    // Start animations with slight delays
    Object.entries(demoData).forEach(([key, value], index) => {
      setTimeout(() => animateStats(key, value), index * 200)
    })
  }, [])

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  const filteredReviews = selectedFilter === 'all' 
    ? recentReviews 
    : recentReviews.filter(review => {
        if (selectedFilter === 'verified') return review.verified
        if (selectedFilter === 'unverified') return !review.verified
        return review.rating === parseInt(selectedFilter)
      })

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-black">Reviews — Customer Feedback</h1>
        <div className="flex gap-3">
          <button className="monochrome-button-gold">
            Export Reviews
          </button>
          <button className="monochrome-button monochrome-button-secondary">
            Filter
          </button>
        </div>
      </section>

      {/* Review Stats */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
        {stats.map((stat) => (
          <div key={stat.key} className="monochrome-metric">
            <div className="text-sm text-gray-600 mb-2 font-medium">{stat.label}</div>
            <div className="text-2xl font-bold text-black">
              {stat.key === 'average' ? stat.value.toFixed(1) : stat.value.toLocaleString()}
            </div>
          </div>
        ))}
      </section>

      {/* Rating Distribution */}
      <section className="monochrome-card p-6">
        <div className="text-lg font-bold mb-4 text-black">Rating Distribution</div>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => {
            const stat = stats.find(s => s.key === (rating === 5 ? 'five' : rating === 4 ? 'four' : rating === 3 ? 'three' : rating === 2 ? 'two' : 'one'))
            const percentage = stats.find(s => s.key === 'total')?.value ? (stat.value / stats.find(s => s.key === 'total').value) * 100 : 0
            
            return (
              <div key={rating} className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-black">{rating}</span>
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-black h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 w-12 text-right">{stat.value}</div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="flex space-x-2">
        {[
          { key: 'all', label: 'All Reviews' },
          { key: 'verified', label: 'Verified' },
          { key: 'unverified', label: 'Unverified' },
          { key: '5', label: '5 Stars' },
          { key: '4', label: '4 Stars' },
          { key: '3', label: '3 Stars' }
        ].map((filter) => (
          <button
            key={filter.key}
            onClick={() => setSelectedFilter(filter.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedFilter === filter.key
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </section>

      {/* Recent Reviews */}
      <section className="space-y-4">
        {filteredReviews.map((review) => (
          <div key={review.id} className="monochrome-card p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {review.user.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-black">{review.user}</div>
                  <div className="text-sm text-gray-500">{review.business}</div>
                </div>
                {review.verified && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Verified
                  </span>
                )}
              </div>
              <div className="text-right">
                <StarRating rating={review.rating} />
                <div className="text-sm text-gray-500 mt-1">{review.date}</div>
              </div>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
