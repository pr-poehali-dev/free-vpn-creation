import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { QRCodeSVG } from 'qrcode.react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Server {
  id: string;
  name: string;
  country: string;
  flag: string;
  ping: number;
}

const servers: Server[] = [
  { id: '1', name: 'Москва', country: 'Россия', flag: '🇷🇺', ping: 5 },
  { id: '2', name: 'Амстердам', country: 'Нидерланды', flag: '🇳🇱', ping: 45 },
  { id: '3', name: 'Нью-Йорк', country: 'США', flag: '🇺🇸', ping: 120 },
  { id: '4', name: 'Токио', country: 'Япония', flag: '🇯🇵', ping: 180 },
  { id: '5', name: 'Лондон', country: 'Великобритания', flag: '🇬🇧', ping: 60 },
  { id: '6', name: 'Сингапур', country: 'Сингапур', flag: '🇸🇬', ping: 200 },
];

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedServer, setSelectedServer] = useState(servers[0]);
  const [speed, setSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [traffic, setTraffic] = useState(0);
  const [connectionTime, setConnectionTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isConnected) {
      interval = setInterval(() => {
        setSpeed(Math.floor(Math.random() * 50) + 50);
        setUploadSpeed(Math.floor(Math.random() * 30) + 20);
        setTraffic(prev => prev + Math.random() * 0.5);
        setConnectionTime(prev => prev + 1);
      }, 1000);
    } else {
      setSpeed(0);
      setUploadSpeed(0);
      setTraffic(0);
      setConnectionTime(0);
    }

    return () => clearInterval(interval);
  }, [isConnected]);

  const toggleConnection = () => {
    setIsConnected(!isConnected);
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const wireguardConfig = `[Interface]
PrivateKey = ${selectedServer.id}abcdef1234567890
Address = 10.0.0.2/24
DNS = 1.1.1.1

[Peer]
PublicKey = server_public_key_${selectedServer.id}
Endpoint = ${selectedServer.name.toLowerCase()}.cybervpn.io:51820
AllowedIPs = 0.0.0.0/0`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        <header className="text-center mb-12 pt-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Icon name="Shield" size={48} className="text-primary" />
            <h1 className="text-6xl font-black gradient-text">CyberVPN</h1>
          </div>
          <p className="text-xl text-muted-foreground font-light">
            VPN SECRET - Быстро надёжно! С нами можно все!
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          <Card className={`p-8 text-center transition-all duration-500 lg:col-span-2 ${isConnected ? 'glow-cyan border-primary' : 'border-border'}`}>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="mb-6">
                  <div className={`mx-auto w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ${isConnected ? 'bg-primary/20' : 'bg-muted'}`}>
                    <Icon 
                      name={isConnected ? "ShieldCheck" : "Shield"} 
                      size={64} 
                      className={`transition-colors duration-500 ${isConnected ? 'text-primary' : 'text-muted-foreground'}`}
                    />
                  </div>
                </div>

                <h2 className="text-3xl font-bold mb-4">
                  {isConnected ? (
                    <span className="gradient-text">Подключено</span>
                  ) : (
                    <span className="text-foreground">Не подключено</span>
                  )}
                </h2>

                <div className="mb-6">
                  <label className="text-sm text-muted-foreground mb-2 block">Выберите сервер:</label>
                  <Select 
                    value={selectedServer.id} 
                    onValueChange={(value) => {
                      const server = servers.find(s => s.id === value);
                      if (server) setSelectedServer(server);
                    }}
                    disabled={isConnected}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {servers.map((server) => (
                        <SelectItem key={server.id} value={server.id}>
                          <span className="flex items-center gap-2">
                            <span className="text-2xl">{server.flag}</span>
                            <span>{server.name}</span>
                            <span className="text-muted-foreground text-sm">({server.ping}ms)</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={toggleConnection}
                  size="lg"
                  className={`w-full text-lg font-semibold transition-all duration-300 ${
                    isConnected 
                      ? 'bg-secondary hover:bg-secondary/90 glow-pink' 
                      : 'bg-primary hover:bg-primary/90 glow-cyan'
                  }`}
                >
                  {isConnected ? 'Отключить VPN' : 'Подключить VPN'}
                </Button>
              </div>

              <div className="flex flex-col justify-center">
                {isConnected && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <Icon name="ArrowDown" size={16} className="text-primary" />
                          Загрузка
                        </span>
                        <span className="text-2xl font-bold text-primary">{speed} Мбит/с</span>
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <Icon name="ArrowUp" size={16} className="text-secondary" />
                          Отдача
                        </span>
                        <span className="text-2xl font-bold text-secondary">{uploadSpeed} Мбит/с</span>
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <Icon name="Database" size={16} />
                          Трафик
                        </span>
                        <span className="text-xl font-bold">{traffic.toFixed(2)} ГБ</span>
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <Icon name="Clock" size={16} />
                          Время
                        </span>
                        <span className="text-xl font-bold">{formatTime(connectionTime)}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {!isConnected && (
                  <div className="text-center text-muted-foreground">
                    <Icon name="ActivitySquare" size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Подключитесь для просмотра статистики</p>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <Card className="p-6 text-center">
            <h3 className="text-lg font-bold mb-4">QR-код для подключения</h3>
            <div className="bg-white p-4 rounded-lg inline-block mb-4">
              <QRCodeSVG 
                value={wireguardConfig}
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Отсканируйте в приложении WireGuard
            </p>
            <div className="mt-4 text-xs text-muted-foreground">
              <p className="font-semibold mb-1">Сервер:</p>
              <p>{selectedServer.flag} {selectedServer.name}</p>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 hover:border-primary transition-colors duration-300">
            <div className="flex items-start gap-4">
              <div className="bg-primary/20 p-3 rounded-lg">
                <Icon name="Zap" size={28} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Обход блокировок</h3>
                <p className="text-muted-foreground">
                  Полный доступ к любым сайтам и сервисам без ограничений
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:border-secondary transition-colors duration-300">
            <div className="flex items-start gap-4">
              <div className="bg-secondary/20 p-3 rounded-lg">
                <Icon name="Lock" size={28} className="text-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Безопасность</h3>
                <p className="text-muted-foreground">
                  Шифрование данных и защита личной информации
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:border-primary transition-colors duration-300">
            <div className="flex items-start gap-4">
              <div className="bg-primary/20 p-3 rounded-lg">
                <Icon name="Gift" size={28} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Бесплатно навсегда</h3>
                <p className="text-muted-foreground">
                  Без подписок, платежей и скрытых комиссий
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="text-4xl font-bold text-center mb-10 gradient-text">
            Как подключить
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-4 mb-6">
                <Icon name="Apple" size={48} className="text-foreground" />
                <h3 className="text-2xl font-bold">iPhone / iPad</h3>
              </div>
              
              <ol className="space-y-4 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">1.</span>
                  <span>Скачайте WireGuard из App Store</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">2.</span>
                  <span>Нажмите "+" → "Создать из QR-кода"</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">3.</span>
                  <span>Отсканируйте QR-код выше</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">4.</span>
                  <span>Активируйте переключатель VPN</span>
                </li>
              </ol>
            </Card>

            <Card className="p-8 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-4 mb-6">
                <Icon name="Smartphone" size={48} className="text-secondary" />
                <h3 className="text-2xl font-bold">Android</h3>
              </div>
              
              <ol className="space-y-4 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">1.</span>
                  <span>Установите WireGuard из Google Play</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">2.</span>
                  <span>Нажмите "+" → "Сканировать QR-код"</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">3.</span>
                  <span>Отсканируйте QR-код выше</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-secondary font-bold">4.</span>
                  <span>Включите подключение</span>
                </li>
              </ol>
            </Card>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-4xl font-bold text-center mb-10 gradient-text">
            Частые вопросы
          </h2>

          <div className="max-w-3xl mx-auto space-y-4">
            <Card className="p-6 hover:border-primary transition-colors duration-300">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Icon name="HelpCircle" size={24} className="text-primary" />
                Действительно ли VPN бесплатный?
              </h3>
              <p className="text-muted-foreground">
                Да! VPN SECRET полностью бесплатный, без скрытых платежей, подписок или ограничений по трафику. Мы не просим данные карты и не показываем рекламу.
              </p>
            </Card>

            <Card className="p-6 hover:border-primary transition-colors duration-300">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Icon name="HelpCircle" size={24} className="text-primary" />
                Какие сайты можно разблокировать?
              </h3>
              <p className="text-muted-foreground">
                Абсолютно любые! Наш VPN обходит все блокировки и позволяет получить доступ к заблокированным сайтам, социальным сетям, мессенджерам и стриминговым сервисам.
              </p>
            </Card>

            <Card className="p-6 hover:border-primary transition-colors duration-300">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Icon name="HelpCircle" size={24} className="text-primary" />
                Безопасно ли использовать VPN?
              </h3>
              <p className="text-muted-foreground">
                Да! Мы используем протокол WireGuard с современным шифрованием. Ваши данные защищены, IP-адрес скрыт, а история посещений не логируется.
              </p>
            </Card>

            <Card className="p-6 hover:border-primary transition-colors duration-300">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Icon name="HelpCircle" size={24} className="text-primary" />
                Как быстро работает VPN?
              </h3>
              <p className="text-muted-foreground">
                WireGuard — самый быстрый VPN-протокол. Скорость практически не отличается от обычного интернета. Выбирайте ближайший сервер для максимальной скорости.
              </p>
            </Card>

            <Card className="p-6 hover:border-primary transition-colors duration-300">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Icon name="HelpCircle" size={24} className="text-primary" />
                На скольких устройствах можно использовать?
              </h3>
              <p className="text-muted-foreground">
                Без ограничений! Устанавливайте на iPhone, iPad, Android, компьютер — на все ваши устройства. Один QR-код работает везде.
              </p>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <Card className="p-8 inline-block">
            <div className="mb-4">
              <Icon name="MessageCircle" size={32} className="text-primary mx-auto" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Нужна помощь?</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Если возникли сложности с подключением — напишите в техподдержку
            </p>
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => window.open('https://t.me/Osint_Gromov', '_blank')}
            >
              <Icon name="Send" size={20} className="mr-2" />
              Написать в Telegram
            </Button>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default Index;