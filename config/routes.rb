Rails.application.routes.draw do
  # resources :categories
  resources :comments, only: [:create]
  resources :solutions, only: %i[index show create] do
    resources :comments, only: [:index]
  end
  resources :challenges, only: %i[index show create]
  resources :users, only: %i[show create] do
    resources :challenges, only: [:index]
  end

  post '/signup', to: 'users#create'
  get '/me', to: 'users#me'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get '/count', to: 'application#count'
end
