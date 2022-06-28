source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "2.7.4"

gem "rails", "~> 7.0.3"

gem "pg", "~> 1.1"

gem "puma", "~> 5.0"

gem "bcrypt", "~> 3.1.7"

gem 'faker', :git => 'https://github.com/faker-ruby/faker.git', :branch => 'master'


gem "tzinfo-data", platforms: %i[ mingw mswin x64_mingw jruby ]

gem "bootsnap", require: false

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem "debug", platforms: %i[ mri mingw x64_mingw ]
end

group :development do
  # Speed up commands on slow machines / big apps [https://github.com/rails/spring]
  # gem "spring"
end

gem 'active_model_serializers',
    '~> 0.10.12',
    git: 'https://github.com/jpawlyn/active_model_serializers.git',
    branch: '0-10-stable'
