Rails.application.routes.draw do
  resources :solutions, only: %i[index show]
  resources :challenges, only: %i[index show]
  resources :users, only: [:create]
  # get '/hello', to: 'application#hello_world'

  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
end
