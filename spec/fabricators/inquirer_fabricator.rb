Fabricator(:inquirer) do
  email { Faker::Internet.email }
  name { Faker::Name.name }
  company { Faker::Company.name }
  phone { Faker::PhoneNumber.phone_number }
end