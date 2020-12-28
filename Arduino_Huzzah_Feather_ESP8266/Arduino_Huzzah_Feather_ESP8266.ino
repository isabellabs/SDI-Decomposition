/**
   ----------------------------------------------------------------------------
   This is a MFRC522 library see https://github.com/miguelbalboa/rfid
**/

#include <SPI.h>
#include <MFRC522.h>
#if defined(ESP8266)
#include <ESP8266WiFi.h>
#else
#include <WiFi.h>
#endif
#include <WiFiUdp.h>
#include <OSCMessage.h>


// RF TAGS
#define RST_PIN         0                       // Configurable, see typical pin layout above
#define SS_PIN          15                      // Configurable, see typical pin layout above

const int cardsNum = 4;

int cartaoEncontrado = -1;
int cartaoCerto = 0;

byte authorizedUIDs[cardsNum][7] = {
  {0x04, 0x92, 0xD4, 0x01, 0xD8, 0x39, 0x03},
  {0x04, 0x92, 0xDC, 0x01, 0xAA, 0x39, 0x03},
  {0x04, 0x92, 0x97, 0x01, 0x99, 0x39, 0x03},
  {0x04, 0xA2, 0x00, 0x01, 0xB9, 0x39, 0x03}
};

MFRC522 rfid(SS_PIN, RST_PIN);                  // Cria instância de MFRC522
// RF TAGS

// WIFI e OSC
char ssid[] = "T5g";                            // your network SSID (name)
char pass[] = "aaaaaaaa";                       // your network password

WiFiUDP Udp;                                    // A UDP instance to let us send and receive packets over UDP
const IPAddress outIp(192, 168, 102, 151);       // remote IP of your computer
const unsigned int outPort = 9962;              // remote port to receive OSC
const unsigned int localPort = 8888;            // local port to listen for OSC packets (actually not used for sending)
// WIFI e OSC

/**
   Inicializar.
**/

void setup() {
  Serial.begin(115200);     // Inicializa porta série para comunicação com PC
  //while (!Serial);          // Espera pela porta série

  SPI.begin();              // Inicia o SPI bus
  rfid.PCD_Init();          // inicia o MFRC522

  // Connect to WiFi network
  Serial.print(millis()); Serial.print(" - ");
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, pass);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");

  Serial.print(millis()); Serial.print(" - ");
  Serial.println("WiFi connected");
  Serial.print(millis()); Serial.print(" - ");
  Serial.println("IP address: ");
  Serial.print(millis()); Serial.print(" - ");
  Serial.println(WiFi.localIP());

  Serial.print(millis()); Serial.print(" - ");
  Serial.println("Starting UDP");

  Udp.begin(localPort);

  Serial.print(millis()); Serial.print(" - ");
  Serial.print("Local port: ");
#ifdef ESP32
  Serial.print(millis()); Serial.print(" - ");
  Serial.println(localPort);
#else
  Serial.print(millis()); Serial.print(" - ");
  Serial.println(Udp.localPort());
#endif







  Serial.print(millis()); Serial.print(" - ");
  Serial.println("Tocar com a etiqueta RFID/NFC no leitor");
}

/**
   Loop principal.
**/



void loop() {
  if (rfid.PICC_IsNewCardPresent()) { // Nova etiqueta
    Serial.println();
    if (rfid.PICC_ReadCardSerial()) { // NUID lido
      MFRC522::PICC_Type piccType = rfid.PICC_GetType(rfid.uid.sak);

      Serial.print(millis()); Serial.print(" - ");
      Serial.print("Tipo de etiqueta RFID/NFC: ");
      Serial.println(rfid.PICC_GetTypeName(piccType));

      // Imprime NUID no monitor série em formato hex
      Serial.print(millis()); Serial.print(" - ");
      Serial.print("UID:");

      for (int i = 0; i < rfid.uid.size; i++) {
        Serial.print(rfid.uid.uidByte[i] < 0x10 ? " 0" : " ");
        Serial.print(rfid.uid.uidByte[i], HEX);
      }
      Serial.println();

      // Determina númerodo cartão, se conhecido
      cartaoEncontrado = -1;
      for (int i = 0; i < cardsNum; i++) {
        cartaoCerto = 1;
        for (int f = 0; f < rfid.uid.size; f++) {
          if (rfid.uid.uidByte[f] != authorizedUIDs[i][f] ) {
            cartaoCerto = 0;
          }
        }
        if (cartaoCerto == 1 ) {
          cartaoEncontrado = i;
        }
      }

      if (cartaoEncontrado >= 0 ) {
        Serial.print(millis()); Serial.print(" - ");
        Serial.print("Cartão");
        Serial.print(" - ");
        Serial.println(cartaoEncontrado);


        OSCMessage msg("/oscControl/slider1");

//        randNumber = random(0, 5);
//
//        Serial.println(randNumber);
        msg.add((int32_t) cartaoEncontrado);

        Udp.beginPacket(outIp, outPort);
        msg.send(Udp);
        Udp.endPacket();
        msg.empty();
        delay(500);





      }
      else {
        Serial.print(millis()); Serial.print(" - ");
        Serial.println("Cartão desconhecido");
      }

      rfid.PICC_HaltA(); // Parar o PICC
      rfid.PCD_StopCrypto1(); // Parar encriptação no PCD
    }
  }
}

/**
   Helper routine to dump a byte array as hex values to Serial.
*/
void dump_byte_array(byte *buffer, byte bufferSize) {
  for (byte i = 0; i < bufferSize; i++) {
    Serial.print(buffer[i] < 0x10 ? " 0" : " ");
    Serial.print(buffer[i], HEX);
  }
}
