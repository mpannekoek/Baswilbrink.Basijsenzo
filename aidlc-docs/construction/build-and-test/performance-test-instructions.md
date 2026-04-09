# Performance Test Instructions

## Purpose
Valideer baseline prestaties van de publieke landing-page route na recente slider- en contentbeheerwijzigingen.

## Performance Requirements (Baseline Targets)
- **Response Time (p95)**: < 500 ms op lokale/staging omgeving voor `/`
- **Throughput**: >= 30 requests/second lokaal (indicatief)
- **Concurrent Users**: test met 20-50 gelijktijdige clients
- **Error Rate**: < 1%

## Setup Performance Test Environment

### 1. Prepare Test Environment
```bash
cd src/web
npm ci
cp .env.example .env.local
npm run build
npm start
```

### 2. Configure Test Parameters
- **Test Duration**: 30 seconden per run
- **Ramp-up Time**: impliciet via load tool
- **Virtual Users**: 20, daarna 50 voor stress-variant

## Run Performance Tests

### 1. Execute Load Test (Autocannon)
Gebruik een tweede terminal:
```bash
npx autocannon -d 30 -c 20 http://localhost:3000/
```

### 2. Execute Stress Variant
```bash
npx autocannon -d 30 -c 50 http://localhost:3000/
```

### 3. Analyze Performance Results
- **Response Time**: vergelijk `p95` met target
- **Throughput**: vergelijk `Req/Sec` met target
- **Error Rate**: controleer non-2xx of socket errors
- **Bottlenecks**:
- hoge TTFB bij cold start
- CPU pieken bij image-heavy slider rendering
- **Results Location**:
- terminal output van `autocannon`

## Performance Optimization
Wanneer targets niet gehaald worden:
1. Controleer image sizes en Next image delivery instellingen.
2. Controleer server CPU/memory pressure tijdens run.
3. Herhaal test na optimalisaties met identieke parameters.
