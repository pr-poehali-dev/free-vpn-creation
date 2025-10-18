import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);

  const toggleConnection = () => {
    setIsConnected(!isConnected);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        <header className="text-center mb-16 pt-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Icon name="Shield" size={48} className="text-primary" />
            <h1 className="text-6xl font-black gradient-text">CyberVPN</h1>
          </div>
          <p className="text-xl text-muted-foreground font-light">
            Бесплатный VPN без ограничений
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <Card className={`p-8 text-center transition-all duration-500 ${isConnected ? 'glow-cyan border-primary' : 'border-border'}`}>
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

            <p className="text-muted-foreground mb-8">
              {isConnected 
                ? 'Ваше соединение защищено и анонимно' 
                : 'Нажмите кнопку для подключения'
              }
            </p>

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
          </Card>

          <div className="space-y-6">
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
        </div>

        <div className="mb-16">
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

              <Button className="w-full mt-6 bg-primary hover:bg-primary/90">
                Инструкция для iOS
              </Button>
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

              <Button className="w-full mt-6 bg-secondary hover:bg-secondary/90">
                Инструкция для Android
              </Button>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <Card className="p-8 inline-block">
            <div className="mb-4">
              <Icon name="Info" size={32} className="text-primary mx-auto" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Нужна помощь?</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Если возникли сложности с подключением, обратитесь в поддержку
            </p>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Связаться с поддержкой
            </Button>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default Index;
