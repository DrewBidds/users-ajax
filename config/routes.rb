Rails.application.routes.draw do
  get 'home/index'

  get 'users/index'

  root 'pages#home' 
end
