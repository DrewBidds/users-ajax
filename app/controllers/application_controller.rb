class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
end

class PagesController < ApplicationController
  def home
  end

  def users
  end
end
