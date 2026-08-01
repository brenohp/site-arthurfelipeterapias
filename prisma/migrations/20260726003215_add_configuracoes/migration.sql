-- CreateTable
CREATE TABLE "ConfiguracaoSite" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "mensagemHeader" TEXT NOT NULL DEFAULT 'Bem-vindo à Arthur Felipe Terapias Orientais',
    "horarioHeader" TEXT NOT NULL DEFAULT 'Seg - Sáb',
    "fotoHeroUrl" TEXT,
    "fotoSobreUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConfiguracaoSite_pkey" PRIMARY KEY ("id")
);
