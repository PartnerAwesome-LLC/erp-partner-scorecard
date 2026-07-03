#!/usr/bin/env python3
"""Regenerate embed.html + embed.js from index.html. Called by the daily cron."""
import sys
sys.path.insert(0, '/home/user/workspace/dashboards-2026-07')
from _gen_embeds import generate_embed
from pathlib import Path
generate_embed(Path('/home/user/workspace/erp-partner-scorecard'), 'pa-erp-scorecard', 'https://partnerawesome-llc.github.io/erp-partner-scorecard/')
print('Regenerated embed.html + embed.js for pa-erp-scorecard')
