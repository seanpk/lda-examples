VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "precise32"
  config.vm.provision :shell, :path => "bootstrap.sh"
  config.vm.network :forwarded_port, host: 27017, guest: 27017
  config.vm.network :forwarded_port, host: 3001, guest: 80
  config.vm.box_url = "http://files.vagrantup.com/precise32.box"
end