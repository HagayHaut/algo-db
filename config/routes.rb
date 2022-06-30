Rails.application.routes.draw do
  # resources :categories
  # resources :comments
  resources :solutions, only: %i[index show create]
  resources :challenges, only: %i[index show create]
  resources :users, only: %i[show create] do
    resources :challenges, only: [:index]
  end

  post '/signup', to: 'users#create'
  get '/me', to: 'users#me'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
end
